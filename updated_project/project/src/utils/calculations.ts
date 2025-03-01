import { Equipment, ProcessState } from '../types';
import * as math from 'mathjs';

const UNIVERSAL_GAS_CONSTANT = 8.314; // J/(mol·K)

export const calculateMassBalance = (nodes: Equipment[], connections: any[]) => {
  return nodes.map(node => {
    const inFlows = connections.filter(conn => conn.target === node.id);
    const outFlows = connections.filter(conn => conn.source === node.id);

    const inFlow = inFlows.reduce((sum, conn) => 
      sum + (conn.data?.flowRate || 0), 0);
    const outFlow = outFlows.reduce((sum, conn) => 
      sum + (conn.data?.flowRate || 0), 0);

    return {
      id: node.id,
      inFlow,
      outFlow,
      accumulation: inFlow - outFlow,
      components: node.parameters.composition
    };
  });
};

export const calculateEnergyBalance = (nodes: Equipment[], connections: any[]) => {
  return nodes.map(node => {
    const inFlows = connections.filter(conn => conn.target === node.id);
    const outFlows = connections.filter(conn => conn.source === node.id);

    const inEnergy = inFlows.reduce((sum, conn) => 
      sum + ((conn.data?.flowRate || 0) * (conn.data?.temperature || 0) * 
      (node.parameters.heatCapacity || 4.186)), 0);

    const outEnergy = outFlows.reduce((sum, conn) =>
      sum + ((conn.data?.flowRate || 0) * node.parameters.temperature * 
      (node.parameters.heatCapacity || 4.186)), 0);

    return {
      id: node.id,
      inEnergy,
      outEnergy,
      deltaE: inEnergy - outEnergy,
      heatTransfer: node.type === 'heat_exchanger' ? 
        calculateHeatTransfer(node).heatDuty : undefined
    };
  });
};

export const calculateVLE = (nodes: Equipment[]) => {
  return nodes
    .filter(node => ['distillation', 'flash', 'evaporator'].includes(node.type))
    .map(node => {
      const { temperature, pressure, composition } = node.parameters;
      
      // Antoine equation for water (as example)
      const A = 8.07131;
      const B = 1730.63;
      const C = 233.426;
      
      const vaporPressure = math.exp(A - (B / (temperature + C)));
      const equilibriumConstant = vaporPressure / pressure;

      return {
        id: node.id,
        temperature,
        pressure,
        vaporPressure,
        equilibriumConstant,
        composition: composition ? {
          vapor: composition.vapor || 0,
          liquid: composition.liquid || 0
        } : undefined
      };
    });
};

export const calculateHeatTransfer = (equipment: Equipment) => {
  const { temperature, flowRate } = equipment.parameters;
  const deltaT = Math.abs(temperature - (equipment.parameters.temperature || 25));
  const overallCoefficient = 500; // Example U value in W/(m²·K)
  const heatDuty = overallCoefficient * deltaT * flowRate;

  return {
    id: equipment.id,
    heatDuty,
    overallCoefficient,
    deltaT
  };
};

export const calculateMassTransfer = (nodes: Equipment[]) => {
  return nodes
    .filter(node => ['distillation', 'absorber', 'extractor'].includes(node.type))
    .map(node => {
      const { flowRate, composition } = node.parameters;
      const transferCoefficient = 0.05; // Example mass transfer coefficient
      const drivingForce = composition ? 
        Math.abs((composition.vapor || 0) - (composition.liquid || 0)) : 0;
      const massFlux = transferCoefficient * drivingForce * flowRate;

      return {
        id: node.id,
        massFlux,
        transferCoefficient,
        drivingForce
      };
    });
};

export const calculateKinetics = (nodes: Equipment[]) => {
  return nodes
    .filter(node => node.type === 'reactor')
    .map(node => {
      const { temperature, pressure, reactionRate } = node.parameters;
      
      // Arrhenius equation
      const activationEnergy = 50000; // Example Ea in J/mol
      const preExponential = 1e6; // Example A factor
      
      const calculatedRate = preExponential * 
        Math.exp(-activationEnergy / (UNIVERSAL_GAS_CONSTANT * (temperature + 273.15)));
      
      const conversion = 1 - Math.exp(-calculatedRate * (reactionRate || 1));

      return {
        id: node.id,
        reactionRate: calculatedRate,
        conversion,
        selectivity: 0.85 // Example selectivity
      };
    });
};

export const calculatePressureDrop = (nodes: Equipment[], connections: any[]) => {
  return nodes.map(node => {
    const { flowRate, pressure } = node.parameters;
    const density = 1000; // Example density in kg/m³
    const viscosity = 0.001; // Example viscosity in Pa·s
    const diameter = 0.1; // Example diameter in m
    const length = 1; // Example length in m

    const velocity = flowRate / (Math.PI * Math.pow(diameter/2, 2));
    const reynoldsNumber = (density * velocity * diameter) / viscosity;
    const frictionFactor = 0.316 / Math.pow(reynoldsNumber, 0.25); // Blasius equation
    const deltaP = (frictionFactor * length * density * Math.pow(velocity, 2)) / (2 * diameter);

    return {
      id: node.id,
      deltaP,
      reynoldsNumber,
      frictionFactor
    };
  });
};
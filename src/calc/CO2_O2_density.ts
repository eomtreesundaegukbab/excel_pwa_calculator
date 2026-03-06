export type StoichInput = {
  phi: number;
};

export type StoichOutput = {
  co2Dry: number;
  o2Dry: number;
};

export function calcStoich({ phi }: StoichInput): StoichOutput {
  if (phi < 0) {
    throw new Error("Phi는 0 이상");
  }

  if (phi > 1) {
    throw new Error("phi <= 1 조건만 지원");
  }

  const co2Mol = 100 * phi;
  const o2Mol = 200 * (1 - phi);
  const n2Mol = 752;

  const dryTotal = co2Mol + o2Mol + n2Mol;

  return {
    co2Dry: co2Mol / dryTotal,
    o2Dry: o2Mol / dryTotal,
  };
}
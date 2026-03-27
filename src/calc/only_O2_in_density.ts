export type OnlyO2Input = {
  phi: number;
};

export type OnlyO2Result = {
  co2Dry: number;
  o2Dry: number;
};

export function calcStoich({ phi }: OnlyO2Input): OnlyO2Result {
  if (!Number.isFinite(phi)) {
    throw new Error("phi must be a finite number");
  }

  if (phi <= 0) {
    throw new Error("phi must be greater than 0");
  }

  if (phi > 1) {
    throw new Error("현재 식은 phi <= 1 범위만 지원합니다.");
  }

  const co2Dry = phi / (2 - phi);
  const o2Dry = (2 * (1 - phi)) / (2 - phi);

  return { co2Dry, o2Dry };
}
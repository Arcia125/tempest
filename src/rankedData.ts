const queues: Record<string, string> = {
  'RANKED_SOLO_5x5': 'Ranked Solo'
};

export const queueFromQueueType = (queueType: string) => queues[queueType] || queueType;

export type RomanNumeral = 'I' | 'II' | 'III' | 'IV' | 'V';

export const romanNumeralToNumber = (romanNumeral: RomanNumeral): number => {
  switch (romanNumeral) {
    case 'V': return 5;
    case 'IV': return 4
    case 'III': return 3;
    case 'II': return 2;
    case 'I': return 1;
    default: return romanNumeral;
  }
};  
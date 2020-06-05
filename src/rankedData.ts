const queues: Record<string, string> = {
  'RANKED_SOLO_5x5': 'Ranked Solo'
};

export const queueFromQueueType = (queueType: string) => queues[queueType] || queueType;
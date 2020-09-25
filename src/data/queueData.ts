import { MatchHistoryItem, Maybe } from '../operations';
import queues from '../static-data/queues.json';

interface Queue {
  description: string | null;
  map: string;
  notes: string | null;
  queueId: number;
}

interface QueueMap {
  [x: number]: Queue;
}

const queuesById = queues.reduce((acc, curr) => {
  acc[curr.queueId] = curr;
  return acc;
}, {} as QueueMap)

export const getQueueName = (queueId: number) => queuesById[queueId].description?.replace('5v5 ', '').replace(' games', '');

export function getQueue(matchHistoryItem?: Maybe<MatchHistoryItem>): React.ReactNode {
  return typeof matchHistoryItem?.queue === 'number'
    ? getQueueName(matchHistoryItem?.queue)
    : '-';
}

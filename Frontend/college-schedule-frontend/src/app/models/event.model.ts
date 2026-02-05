export interface Event {
  id: number;
  type: 'lecture' | 'practice' | 'extra' | 'activity';
  category: 'study' | 'extra';
  time: string;
  name: string;
  details: { icon: string; text: string }[];
  tags: string[];
  isCurrent?: boolean;
  timeRemaining?: string;
  startTime?: string;
  endTime?: string; 
}
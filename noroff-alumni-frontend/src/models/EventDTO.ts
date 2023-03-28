type EventDTO = {
  id: number;
  createdBy: string;
  groupId: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  name: string;
  participants: string[];
  theme: number;
}

export default EventDTO;
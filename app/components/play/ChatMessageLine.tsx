import { ChatMessage } from '@/app/models/chatmessage.model';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FormattedRelativeTime } from 'react-intl';

interface ChatMessageLineProps {
  chatMessage: ChatMessage;
}

const ChatMessageLine = ({ chatMessage }: ChatMessageLineProps) => {
  
  const now = new Date();
  const timeElapsed = Math.floor((now.getTime() - chatMessage.timestamp) / 1000);
  
  return (
    <div className='flex items-center gap-3'>
      <Avatar>
        <AvatarFallback>{chatMessage.author.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <div>
          <span className='text-sm'>{chatMessage.author.name}</span>
          <span className='ml-1 text-xs text-muted-foreground'>
            <FormattedRelativeTime
              value={-timeElapsed}
              updateIntervalInSeconds={1}
            />
          </span>
        </div>
        <span className='text-sm text-muted-foreground'>{chatMessage.message}</span>
      </div>
    </div>
  )
}

export default ChatMessageLine;
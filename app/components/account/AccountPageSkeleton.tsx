import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const AccountPageSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='w-36 h-6' />
        <Skeleton className='w-96 h-5 '/>
      </CardHeader>
      <CardContent>
        <Skeleton className='w-64 h-5' />
      </CardContent>
      <CardFooter>
        <div className='flex justify-between items-center w-full'>
          <Skeleton className='w-72 h-5' />
          <Skeleton className='w-36 h-8' />
        </div>
      </CardFooter>
    </Card>
  );
}

export default AccountPageSkeleton;
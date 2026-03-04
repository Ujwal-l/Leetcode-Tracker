import { Button } from './ui/button';

export function DomainPicker({
  onSelect,
}: {
  onSelect: (domain: string) => void;
}) {
  return (
    <div className='flex gap-2'>
      <Button onClick={() => onSelect('data-science')}>Data Science</Button>
      <Button onClick={() => onSelect('development')}>Development</Button>
    </div>
  );
}

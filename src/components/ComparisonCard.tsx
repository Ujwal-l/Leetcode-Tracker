import { Card, CardContent } from './ui/card';
import type { Comparison } from '@/lib/domains';

export function ComparisonCard({ comparison }: { comparison: Comparison }) {
  return (
    <Card>
      <CardContent>
        <h2>{comparison.title}</h2>
        <p>{comparison.description}</p>
      </CardContent>
    </Card>
  );
}

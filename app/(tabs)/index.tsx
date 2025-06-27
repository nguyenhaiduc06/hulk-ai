import { Link } from 'expo-router';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <Container>
      <ScreenContent path="app/(tabs)/index.tsx" title="Home"></ScreenContent>
      <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
        <Button title="Show Details" />
      </Link>
      <Link href="/chat" asChild>
        <Button title="Open Chat" />
      </Link>
    </Container>
  );
}

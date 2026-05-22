import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from 'convex/react';

import { api } from '#/_generated/api';

export const Route = createFileRoute('/about')({
  component: About,
});

function About() {
  const tasks = useQuery(api.tasks.get);

  return (
    <div className="App">
      {tasks?.map(({ _id, text }) => (
        <div key={_id}>{text}</div>
      ))}
    </div>
  );
}

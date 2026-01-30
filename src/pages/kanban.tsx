import { CONFIG } from 'src/config-global';

import { KanbanView } from 'src/sections/kanban/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Kanban - ${CONFIG.appName}`}</title>
      <meta
        name="description"
        content="Kanban board for project and task management"
      />
      <meta name="keywords" content="kanban,board,tasks,project management" />

      <KanbanView />
    </>
  );
}

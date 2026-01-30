import { CONFIG } from 'src/config-global';

import { CourseView } from 'src/sections/course/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Course - ${CONFIG.appName}`}</title>
      <meta
        name="description"
        content="Course dashboard with progress tracking and statistics"
      />
      <meta name="keywords" content="course,learning,education,progress" />

      <CourseView />
    </>
  );
}

import type { CardProps } from '@mui/material/Card';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';
// ----------------------------------------------------------------------

type Props = CardProps & {
  myAccount: {
    displayName: string;
    email: string;
    photoURL: string;
  };
};

export function CourseMyAccount({ myAccount, sx, ...other }: Props) {
  return (
    <Card
      sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        ...sx,
      }}
      {...other}
    >
      <Avatar
        src={myAccount.photoURL}
        alt={myAccount.displayName}
        sx={{
          width: 80,
          height: 80,
          mb: 2,
        }}
      />

      <Typography variant="subtitle1" noWrap sx={{ mb: 0.5 }}>
        {myAccount.displayName}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        {myAccount.email}
      </Typography>

      <Box
        sx={(theme) => ({
            gap: 2,
            width: 1,
            py: 2.5,
            display: 'grid',
            borderRadius: 1.5,
            typography: 'subtitle2',
            gridTemplateColumns: 'repeat(2, 1fr)',
            bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
            border: `dashed 1px ${theme.vars.palette.divider}`,
        })}
      >
        <Stack alignItems="center">
          {fShortenNumber(1984)}
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Rank
          </Typography>
        </Stack>

        <Stack alignItems="center">
          {fShortenNumber(19002)}
          <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Points
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}

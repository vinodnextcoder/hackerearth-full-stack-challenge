import { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Comments from './Comments';
import Moment from 'moment';

function Match({ match }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Match
          </Typography>

          <Typography variant="h5" component="div" align="center">
            {match.amount} - {match.unitConsume}
          </Typography>

          <Typography variant="h6" component="div" align="center">
            {match.billStatus}
          </Typography>
          Bill Date
          <Typography variant="h6" component="div" align="center">
            {Moment(match.created_at).format("DD/MM/YYYY") }
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" onClick={async () => setOpen(true)}>
            Comments
          </Button>
        </CardActions>
      </Card>

      {open ? <Comments open={open} setOpen={setOpen} match={match} /> : null}
    </>
  );
}

export default Match;

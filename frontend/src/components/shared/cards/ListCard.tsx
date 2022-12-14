import { IconCar } from '@tabler/icons';   
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import { Divider, Typography } from '@mui/material';
import { Button } from '@mui/material/';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

//import css
import './ListCard.scss';


const listStyle = {
    backgroundColor: '#f8f8f8',
    padding: '20px',
};

const listItemStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '8px',
};

export interface Props {
    elements: Element[]
}

interface Element {
    id?: string;
    name: string;
    quantity?: string;
    quantity2?: string;
    origin?: string;
    destination?: string;
}



const ListCard: React.FC<Props> = ({ elements}) => {
    return (
        <div className='list-card-wrapper'>
                <div className='list-card-rows'>
                    {elements.map((element, i, elements) => {
                        return (
                            <ListRows
                                id={element.id}
                                name={element.name}
                                quantity={element.quantity}
                                quantity2={element.quantity2}
                                origin={element.origin}
                                destination={element.destination}
                                lastOne={i === elements.length - 1}
                                key={element.id}
                            />
                        );
                    })}
                </div>
                <div className='view-all-button'>
                    <Button size="small" disableElevation>
                        View All
                        <ChevronRightOutlinedIcon />
                    </Button>
                </div>
        </div>
    );
}
export default ListCard;

interface RowData extends Element {
    lastOne: Boolean
}

const ListRows: React.FC<RowData> = (element) => {
    return (
        <div className='list-card-row'>
            <Grid item xs={12}>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                    {element.name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography className="list-card-row-quantity" variant="subtitle1" color="inherit">
                                            {element?.quantity ? element.quantity : element.destination}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography className="list-card-row-quantity2" variant="subtitle2" >
                            {element?.quantity2 ? element?.quantity2 : "Origin: " + element.origin}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            {
                !element.lastOne && <Divider sx={{ my: 1.5 }} />
            }
        </div>
    );
}
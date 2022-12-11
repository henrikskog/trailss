import { IconCar } from '@tabler/icons';   
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
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
    text: string;
    textAfter: string;
}

interface Element {
    id: number;
    name: string;
    quantity: number;
    quantity2: string | number;
    
}



const ListCard: React.FC<Props> = ({ elements, text, textAfter }) => {
    return (
        <div className='list-card-wrapper'>
                <div className='list-card-rows'>
                    {elements.map((element, i, elements) => {
                        return (
                            <ListRows
                                id={element.id}
                                name={element.name}
                                quantity={element.quantity}
                                quantity2={`${text} ${element.quantity2} ${textAfter}`}
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
                                            {element.quantity}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography className="list-card-row-quantity2" variant="subtitle2" >
                            {element.quantity2}
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
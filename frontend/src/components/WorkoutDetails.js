import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ({workout}) => {

    const {dispatch} = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch("/api/workouts/" + workout._id, {
            method: "DELETE",
        })

        const json = await response.json()

        if (response.ok){
            dispatch({type: "DELETE_WORKOUT", payload: json})
        }
    }
    return (
    <div className="workout-details">
        <h4>{workout.title}</h4>
        <p>Load (kg): <strong>{workout.load}</strong></p>
        <p>Reps: <strong>{workout.reps}</strong></p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix : true})}</p>
        <span onClick={handleClick}><DeleteIcon/></span>
    </div>);
}
 
export default WorkoutDetails;
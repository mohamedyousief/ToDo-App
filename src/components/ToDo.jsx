import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';

const ToDo = ({ titel, finish, idx, onChangeStat ,onEdit,onEditClick,onDelete }) => {
    
    const iconsStyle={
         width: "30px",
        height: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        background: "white"                       
}
    return (
        <>
            <div className="todo" style={{
                background: "blue",
                color: "white",
                width: "100%",
                marginBottom: "20px",
                padding: "20px 15px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <div className="icons" style={{
                    display: "flex",
                    gap: "5px"
                }}>
                    <div style={iconsStyle} onClick={()=>onDelete(idx)}>
                        <DeleteForeverIcon style={{
                            color: "red"
                        }} />
                    </div>
                    <div style={{...iconsStyle,backgroundColor:onEditClick?"black" : 'white'}} onClick={()=>onEdit(idx)}>
                        <EditSharpIcon style={{
                            color: onEditClick?"white" : 'black'
                        }} />
                    </div>
                    <div style={{...iconsStyle,background:finish ? "green" : "white"}} onClick={()=>onChangeStat(idx)}>
                        <CheckSharpIcon style={{
                            color: finish ? "white" : "green",
                        }} />
                    </div>
                            
                </div>
                <p>{ titel }</p>
            </div>
        </>
    );
}

export default ToDo

import Button from "@mui/material/Button";
import React from "react";
import { useAppDispatch } from "../../../../global/redux/hooks";
import { setIsConfigFinished } from "../../redux/reducers/slices/gameStateSlice";

export default function GameSetup() {
    const dispatch = useAppDispatch();

    return (
        <div className="d-flex justify-content-center" >
            <Button
                className='w-auto'
                variant='contained'
                color='primary'
                type='submit'
                onClick={() => dispatch(setIsConfigFinished(true))}
            >
                Start
            </Button>
        </div>
    );
}

function Timer({ minutes = 0, seconds = 0 }) {
    return ( 
        <div className="flex font-semibold items-baseline">
            <p className="text-4xl">{minutes}</p>
            <p className="font-bold">m</p>
            <p className="text-4xl">:{seconds}</p>
            <p className="font-bold">s</p>
        </div>
     );
}

export default Timer;
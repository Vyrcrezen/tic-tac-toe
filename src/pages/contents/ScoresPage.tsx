import React, { useState } from "react";
import { useLoaderData } from "react-router";

export default function ScoresPage() {

    const scores = useLoaderData();

    const [trigger, toggleTrigger] = useState(false);

    return (
        <div>
            Scores:
            <pre>
                {JSON.stringify(scores)}
            </pre>
            <button
            onClick={() => toggleTrigger(!trigger)}
            >Score!</button>
        </div>
    );
}

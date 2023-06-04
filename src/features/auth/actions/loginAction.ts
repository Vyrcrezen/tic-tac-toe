import { ActionFunction, redirect } from "react-router";

/**
 * Normally, this where API calls to the server would take place to authenticate the user
 * However, this is a serverless application, so without API calls, we just redirect the user
 * @returns 
 */
const loginAction: ActionFunction = async ({ request, params }: { request: Request, params: {} }) => {
    
    return redirect('/');
}

export default loginAction;
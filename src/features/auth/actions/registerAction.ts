import { ActionFunction, redirect } from "react-router";

/**
 * Normally, this where API calls to the server would take place to handle the registration of the user
 * However, this is a serverless application, so without API calls, we just redirect the user
 * @returns 
 */
const registerAction: ActionFunction = async ({ request, params }: { request: Request, params: {} }) => {
    return redirect('/login');
}

export default registerAction;

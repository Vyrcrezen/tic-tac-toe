import { ActionFunction, redirect } from "react-router";


const loginAction: ActionFunction = async ({ request, params }: { request: Request, params: {} }) => {

    // const formData = await request.formData();

    // const fromEntries = {
    //     username: formData.get("username")?.toString(),
    //     password: formData.get("password")?.toString(),
    // };

    // return fromEntries;
    
    return redirect('/');
}

export default loginAction;
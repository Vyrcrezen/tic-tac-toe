import { ActionFunction, redirect } from "react-router";

const registerAction: ActionFunction = async ({ request, params }: { request: Request, params: {} }) => {

    // const formData = await request.formData();

    // const fromEntries = {
    //     username: formData.get("username")?.toString(),
    //     password: formData.get("password")?.toString(),
    //     email: formData.get("email")?.toString(),
    // };

    return redirect('/login');
}

export default registerAction;

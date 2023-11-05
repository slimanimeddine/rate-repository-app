import { SignInForm, validationSchema } from "../../component/SignIn";
import {
    render,
    fireEvent,
    screen,
    waitFor,
    act,
} from "@testing-library/react-native";

describe("SignInForm", () => {
    it("works with correct username and password", async () => {
        //mock function for testing
        const onSubmit = jest.fn();

        render(<SignInForm handler={onSubmit} />);

        screen.debug();

        const usernameInput = screen.getByPlaceholderText("username");
        const passwordInput = screen.getByPlaceholderText("password");
        const submitButton = screen.getByTestId("signin");

        //write username
        await act(async () => {
            await fireEvent.changeText(usernameInput, "kalle");
        });

        //write password
        await act(async () => {
            await fireEvent.changeText(passwordInput, "password");
        });

        //expect username and password to be correct
        expect(usernameInput.props.value).toBe("kalle");
        expect(passwordInput.props.value).toBe("password");

        //wrap the on submit function into an act function
        //to make sure that the onSubmit function is called
        //when the submit button is pressed
        await act(async () => {
            await fireEvent.press(submitButton);
        });

        //expect the onSubmit function to be called
        await waitFor(() => {
            expect(usernameInput.props.value).toBe("");
            expect(passwordInput.props.value).toBe("");
            expect(onSubmit).toHaveBeenCalledTimes(1);
            expect(onSubmit).toHaveBeenCalledWith({
                username: "kalle",
                password: "password",
            });
        });
    });
});
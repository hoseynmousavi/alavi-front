type RetrieveInitialStateProps<S> = {
    key: "category" | "project" | "home";
    initialState: S;
    props: { [key: string]: S };
};

function retrieveInitialState<S>(argument: RetrieveInitialStateProps<S>): S {
    const {key, initialState, props} = argument
    const initialStateInProps = props[key]
    if (initialStateInProps) return initialStateInProps
    else if (typeof window !== "undefined" && window.serverData?.[key]) return window.serverData?.[key]
    return initialState
}

export default retrieveInitialState

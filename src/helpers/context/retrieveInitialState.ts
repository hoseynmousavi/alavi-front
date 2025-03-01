type RetrieveInitialStateProps<S> = {
    key: "person" | "category" | "show" | "categoryShow" | "flex" | "season" | "subscription" | "personShow";
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

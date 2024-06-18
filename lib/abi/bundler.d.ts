export declare const bundlerAbi: ({
    type: string;
    inputs: {
        name: string;
        type: string;
        internalType: string;
    }[];
    stateMutability: string;
    name?: undefined;
    outputs?: undefined;
} | {
    type: string;
    stateMutability: string;
    inputs?: undefined;
    name?: undefined;
    outputs?: undefined;
} | {
    type: string;
    name: string;
    inputs: ({
        name: string;
        type: string;
        internalType: string;
        components: {
            name: string;
            type: string;
            internalType: string;
        }[];
    } | {
        name: string;
        type: string;
        internalType: string;
        components?: undefined;
    })[];
    outputs: {
        name: string;
        type: string;
        internalType: string;
    }[];
    stateMutability: string;
} | {
    type: string;
    name: string;
    inputs: never[];
    stateMutability?: undefined;
    outputs?: undefined;
})[];

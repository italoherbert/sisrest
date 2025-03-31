import { useRouter } from "next/router";

import ButtonOutline from "./ButtonOutline";

const BackButton = () => {

    const router = useRouter();

    return (
        <ButtonOutline onClick={ () => router.back() }>
            Voltar
        </ButtonOutline>
    );

};

export default BackButton;
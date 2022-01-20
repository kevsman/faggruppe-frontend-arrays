import { ChangeEvent, useState } from "react";
import OverviewComponent from "../../components/overview/Overview";
import { Wrapper } from "./Home.style";

type Props = {

}

const HomeComponent: React.FC<Props> = (props) => {
    const passwords = ['get', 'rich', 'fast'];
    const [passKey, setPassKey] = useState('');
    const [hasCorrectKey, setHasCorrectKey] = useState(false);

    const onPassKeyChange = (event: ChangeEvent<HTMLInputElement>) => setPassKey(event.target.value);

    const onCheckPassKey = () => {
        /**
         * Oppgave 1:
         * - Sjekk om passKey finnes i passwords
         * - Det finnes flere måter å løse dette på. 
         * - Finn 3 forskjellige, f.eks .some, .find, .reduce
         */

        const hasCorrectKey = passwords.some(password => passKey === password);
        // const hasCorrectKey = passwords.find(password => passKey === password) !== undefined;
        // const hasCorrectKey = passwords.reduce((isCorrect, password) => isCorrect ? isCorrect : passKey === password, false);
        setHasCorrectKey(hasCorrectKey);
    }

    return (
        <>
            <Wrapper>
                {
                    !hasCorrectKey &&
                    <div>
                        <h2>Velkommen til UCs pokerbule</h2>
                        <div>
                            <div>
                                <input type="password" onChange={(e) => onPassKeyChange(e)}></input>
                                <button onClick={() => onCheckPassKey()}>Slipp meg inn</button>
                            </div>
                        </div>
                    </div>
                }
                {
                    hasCorrectKey && <OverviewComponent></OverviewComponent>
                }
            </Wrapper>
        </>
    );
}

export default HomeComponent;
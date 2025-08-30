import { DynamicDashboard } from './components/DynamicDashboard';

import './App.css';

export function App(props) {
    props.onRender?.();

    return <DynamicDashboard />;
}

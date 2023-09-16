import "./App.scss";
// import { Navbar } from "./components";
import Routers from "./routes/Routers";
import { StoreProvider } from "./utils/storeContext";

function App() {
	return (
		<>
			<StoreProvider>
				<div className="app">
					<Routers />
				</div>
			</StoreProvider>
		</>
	);
}

export default App;

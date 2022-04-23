import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import "./scss/App.scss";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/admin" element={<List/>}/>
                    <Route path="/admin/users" element={<List/>}/>
                </Routes> 

                
                {/* <Routes>
                    <Route index element={<Login />} />
                </Routes>
                <Routes>
                    <Route path="/">
                        <Route path="admin">
                            <Route index element={<List />} />
                        </Route>
                    </Route>
                </Routes> */}
            </BrowserRouter>
        </div>
    );
}

export default App;

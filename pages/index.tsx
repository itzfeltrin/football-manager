import type { NextPage } from "next";
import { Header } from "../components/layout/Header";
import { Team } from "../components/Team";
import classes from "../styles/pages/Home.module.css";

const Home: NextPage = () => {
	return (
		<main className={classes.root}>
			<Header />
			<div className={classes.container}>
				<div className={classes.teams}>
					<section>
						<Team id={1} />
					</section>
					<section>
						<Team id={2} />
					</section>
				</div>
			</div>
		</main>
	);
};

export default Home;

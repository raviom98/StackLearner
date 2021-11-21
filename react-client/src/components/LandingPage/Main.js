// Author: Devarshi Pandya
// Email: devarshi.pandya@dal.ca
// Banner ID: B00840003

import React, {Component} from 'react';
import axios from '../../authentication/axios-user-management';
import ProjectCard from './ProjectCard';
import Loading from '../Common/Loading';
import Testimonials from './Testimonials';
import Radium, {StyleRoot} from "radium";
import {bounceInUp, fadeIn, fadeInDown, fadeInLeft, fadeInUp} from "react-animations";

const styles = {
	fadeIn: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn')
	},
	fadeInLeft: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
	},
	bounceInUp: {
		animation: 'x 1s',
		animationName: Radium.keyframes(bounceInUp, 'bounceInUp')
	},
	fadeInUp: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeInUp, 'fadeInUp')
	},
	fadeInDown: {
		animation: 'x 1s',
		animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
	}
}

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: [],
			error: false
		};
	}

    getAllProjects = () => {
			axios.get('/landingpage/projects').then((res) => {
				console.log(res);
				if (res.status === 200) {
					this.setState({
						projects: res.data
					});
				}
			}).catch((err) => {
				console.log(err.response)
				this.setState({
					error: true
				})
			});
    }

    setBackgroundColors = (projects) => {
        const backgroundColorsBaseList = ['pink-background', 'blue-background', 'green-background', 'orange-background'];
        const numberOfProjects = projects.length;
        const projectsAfterWhichToLoop = Math.ceil(numberOfProjects / 4);

			let counter = 0;
        let backGroundColorsArray = [];
        while (counter < projectsAfterWhichToLoop) {
            backGroundColorsArray = backgroundColorsBaseList.concat(backgroundColorsBaseList);
            counter++;
        }

			return backGroundColorsArray;
    }

    displayProjectCards = (projects) => {
        const backGroundColorsArray = this.setBackgroundColors(projects);
        return projects.map((project, index) => {
            return <ProjectCard key={project._id} imageBackgroundColor={backGroundColorsArray[index]} {...project} />
        });
    }

    componentDidMount() {
			// This should run
			this.getAllProjects();
		}

    render() {
        const { projects } = this.state;
        return (
            <main>
                <section className="landing-projects-section gray-background">
									<div className="container">
										<div className="grid">
											<div className="col-md-8 col-sm-12">
												<h2>What We'll Build</h2>
												<hr className="thick"/>
											</div>
										</div>
										<StyleRoot>
											<div className={styles.fadeInUp}>
												{
													projects.length > 0 ? <div className="grid landing-projects-wrapper">
														{this.displayProjectCards(projects)}
													</div> : <Loading message="Loading your projects..."/>
												}
											</div>
										</StyleRoot>

									</div>
                </section>
                <Testimonials />
            </main>
        );
    }
}

export default Main;

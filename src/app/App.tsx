import React, { Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import styles from './app.module.scss';
import useMetrika from '../hooks/useMetrika';

const Modal = React.lazy(
	() => import('../components/modal' /*webpackChunkName: "modal" */)
);

const AnotherComponent = React.lazy(
	() =>
		import(
			'../components/another-component' /*webpackChunkName: "another-component" */
		)
);

export const App = () => {
	const { ym, gtag } = useMetrika();

	const handleBuyClick = () => {
		// Отправляем событие в Яндекс.Метрику
		ym('reachGoal', 'buy');

		// Отправляем событие в Google Analytics
		gtag('event', 'add_to_cart', {
			event_name: 'add_to_cart',
		});
	};

	return (
		<div className={styles.page}>
			<div className={styles.links}>
				<Link to='/another' className={styles.link}>
					Перейти на страницу с компонентом AnotherComponent
				</Link>
				<Link to='/modal' className={styles.link}>
					Перейти на страницу с компонентом Modal
				</Link>
				<div className={styles.page}>
					{/* ОДНА КНОПКА ДЛЯ ОБЕИХ МЕТРИК */}
					<button className={styles.link} onClick={handleBuyClick}>
						Купить в 1 клик
					</button>
				</div>
			</div>

			<Routes>
				<Route
					path='/modal'
					element={
						<Suspense fallback={<div>Loading...</div>}>
							<Modal />
						</Suspense>
					}
				/>
				<Route
					path='/another'
					element={
						<Suspense fallback={<div>Loading...</div>}>
							<AnotherComponent />
						</Suspense>
					}
				/>
			</Routes>
		</div>
	);
};

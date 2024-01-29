import "./style.scss";
import { useRef, useCallback, useState } from "react";
import SignIn from "~/component/SignIn/SignIn";
import Login from "~/component/Login/Login";
function Landing() {
	const handleScrollToTop = useCallback(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);
	const aboutRef = useRef(null);
	const handleScrollToAbout = useCallback(() => {
		aboutRef.current.scrollIntoView({ behavior: "smooth" });
	}, []);
	const handleScrollToContact = useCallback(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, []);

	const [showSignIn, setShowSignIn] = useState(false);

	const handleShowSignIn = useCallback(() => {
		setShowSignIn(true);
	}, []);

	const [showLogin, setShowLogin] = useState(false);

	const handleShowLogin = useCallback(() => {
		setShowLogin(true);
	}, []);
	return (
		<div className="lContainer">
			{showLogin && (
				<Login
					setShowSignIn={setShowSignIn}
					onClose={() => setShowLogin(false)}
				/>
			)}
			{showSignIn && (
				<SignIn
					setShowLogin={setShowLogin}
					onClose={() => setShowSignIn(false)}
				/>
			)}
			<div className="hero">
				<div className="nav">
					<ul>
						<li onClick={handleScrollToTop}>Top</li>
						<li onClick={handleScrollToAbout}>About</li>
						<li onClick={handleScrollToContact}>Contact</li>
					</ul>
				</div>
				<div className="heroContent">
					<div className="logoBlock">
						<div></div>
						<h1>Funhub</h1>
					</div>
					<div className="textBlock">
						<h1>FunHub - 笑顔と創造性を共有する場所</h1>
						<p>
							他のSNSとは異なり、時には他人の悩みを見ることで自分の気分が悪くなる。私たちはあなたに自由で創造的な空間を提供し、笑いの興味深いコンテンツが満載です。
							<br />
							<br />
							一緒に参加して、強いコミュニティを築き上げ、喜びを共有しましょう！！
						</p>
					</div>
					<div className="btnBlock">
						<button onClick={handleShowSignIn}>登録する</button>
						<button onClick={handleShowLogin}>ログイン</button>
					</div>
				</div>
			</div>
			<div className="mainContent">
				<div className="info" ref={aboutRef}>
					<div className="infoBlock">
						<div className="textBlock">
							<h2>もう嫌じゃないの？？</h2>
							<p>
								仕事の一日からストレスを解消したいけれど、SNSに入るとネガティブな投稿がたを爆笑させることを保証します。FunHubにぜひご参加いただき、お目について、ますます疲れてしまうことはありませんか？FunHubはその解決策です！最初の1分間であな楽しみください！
							</p>
						</div>
						<div className="infoCard">
							<div className="card">
								<div className="cardImg"></div>
								<h3>楽しいコンテンツばかり！</h3>
								<p>
									私たちは全てがポジティブで笑えるコンテンツだけで構成された環境を提供しています。
								</p>
							</div>
							<div className="card">
								<div className="cardImg"></div>
								<h3>匿名で誰にも知らない!</h3>
								<p>
									匿名で参加でき、周りの人々に趣味を評価される心配はありません。
								</p>
							</div>
						</div>
					</div>
					<div className="infoImg"></div>
				</div>
				<div className="exBl">
					<div className="introImg"></div>
					<div className="textBlock">
						<h2>共有しよう！！</h2>
						<p>
							笑い声とリラックス感にあふれたSNSを作ることを目指して、皆さんに参加と共有をお願いしています。一日の中で楽しかった瞬間や、単に笑わせてくれた瞬間を共有してください。
							<br />
							他の人と面白いコンテンツを共有することも、自分にとって楽しさを生み出す方法の一つだと信じています。
						</p>
					</div>
				</div>
				<div className="exBl">
					<div className="crAccountImg"></div>
					<div className="textBlock">
						<h2>カウント作成は簡単！！</h2>
						<p>
							面倒な登録手続きは一切ありません。FunHubでは、自分のメールアドレスだけで、わずか1分でアカウントを作成できます。
							<br />
							多くの情報は不要で、電話番号も必要ありません。これにより、あなたの情報を安全に保ちつつ、時間も節約できます。
						</p>
						<br />
						<button onClick={handleShowSignIn}>登録する</button>
					</div>
				</div>
			</div>
			<div className="botCatchCopy">
				<div className="textBlock">
					<h2>たくさん観て、たくさん共有しよう！</h2>
					<br />
					<p>
						FunHub -
						興味津々なコンテンツが詰まった場所。一緒に参加し、活気あるコミュニティの一部となり、創造性と楽しさが絶え間なく広がる場所。
						<br />
						今すぐ登録して、前向きなソーシャルエクスペリエンスを体験し、楽しさを共有する冒険を始めましょう！
					</p>
					<br />
					<button onClick={handleShowSignIn}>登録する</button>
				</div>
			</div>
			<div className="footer">
				<div className="ctBox">
					<div className="contact">
						<br />
						<div className="contactInfo">
							<i className="fbIcon"></i>
							<a href="https://www.facebook.com/Huynh.me123/" target="new">
								Đức Huỳnh
							</a>
						</div>
						<div className="contactInfo">
							<i className="insIcon"></i>
							<a href="https://www.instagram.com/n.d_.huynh/" target="new">
								n.d_.huynh
							</a>
						</div>
						<div className="contactInfo">
							<i className="gitHubIcon"></i>
							<a href="https://github.com/huynhnguyen1906" target="new">
								huynhnguyen1906
							</a>
						</div>
					</div>
					<div className="footerLogo"></div>
					<div className="footerNav">
						<br />
						<ul>
							<li onClick={handleScrollToTop}>Top</li>
							<li onClick={handleScrollToAbout}>About</li>
							<li onClick={handleScrollToContact}>Contact</li>
						</ul>
					</div>
				</div>
				<p className="cpRight">
					<small>
						&copy;Create by{" "}
						<a href="https://github.com/huynhnguyen1906" target="new">
							Huynhnguyen1906
						</a>
					</small>
				</p>
			</div>
		</div>
	);
}

export default Landing;

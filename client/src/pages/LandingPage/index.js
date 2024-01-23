import "./style.scss";
function Landing() {
	return (
		<div className="container">
			<div className="hero">
				<div className="nav">
					<ul>
						<li>Top</li>
						<li>About</li>
						<li>Contact</li>
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
							ここでは、評価を気にせず、自由に笑顔と創造性をシェアできる独自のソーシャルスペースです。登録して、活気あるコミュニティに参加し、ポジティブな雰囲気で共感を広げましょう。
							<br />
							<br />
							あなたらしい自由な表現が楽しめるFunHubで、新しいつながりを見つけましょう！
						</p>
					</div>
					<div className="btnBlock">
						<button>サインイン</button>
						<button>ログイン</button>
					</div>
				</div>
			</div>
			<div className="mainContent">
				<div className="info">
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
			</div>
		</div>
	);
}

export default Landing;

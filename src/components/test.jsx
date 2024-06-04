import { GitHubLogoIcon, ShadowNoneIcon } from "@radix-ui/react-icons";
import {
	Card,
	Flex,
	Text,
	Avatar,
	Button,
	Heading,
	Separator,
	ScrollArea,
	Box,
} from "@radix-ui/themes";
import bgPalette from "@assets/palette.png";
import { GITHUB_APP } from "@utils/consts";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAggregate, getEmbeddings, githubAuth } from "@api/project";
import { useAppDispatch, useAppSelector } from "@state/index";
import { fetchUserSilent } from "@state/reducers/auth";
import { GithubAccountModal } from "./GithubAccountModal";
import { ProjectDoc } from "@trag/types";
import { RepoModal } from "./RepoModal";
import styles from "./Repos.module.scss";
import { Github, Repository, Xmark } from "iconoir-react";
import { ANALYTICS_TRAG, mixpanel } from "@analytics/mixpanel";

console.log("asdad");
const Repos = () => {
	const [searchParams] = useSearchParams();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [projectToView, setProjectToView] = useState<ProjectDoc | null>(null);
	const dispatch = useAppDispatch();
	const {
		github: { connections },
		displayName,
	} = useAppSelector((s) => s.auth.sbUser);
	const projects = useAppSelector((s) =>
		Object.keys(s.project).map((key) => s.project[key])
	);
	const installationId = searchParams.get("installation_id");

	useEffect(() => {
		if (installationId) {
			githubAuth(installationId).then(async () => {
				mixpanel.track(ANALYTICS_TRAG.CONNECT_GITHUB);
				navigate(pathname);
				dispatch(fetchUserSilent());
			});
		}
	}, [installationId]);

	const handleGithub = () => {
		window.open(GITHUB_APP())?.focus();
	};

	const getAvatarUrl = (cId: string) =>
		connections.find((c) => c.connection_id === cId)?.avatar_url || "";

	useEffect(() => {
		getAggregate();
	}, []);

	return (
		<Flex direction="column" gap="5" height="100%">
			<Heading>Repositories</Heading>
			<Flex gap="4" direction="column" height="100%" overflow="scroll">
				<div
					style={{
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						borderRadius: "var(--radius-3)",
						backgroundImage: `url(${bgPalette})`,
						backgroundColor: "color(display-p3 0.095 0.098 0.105)",
					}}
				>
					<Flex
						py="4"
						gap="7"
						align="center"
						justify="center"
						direction="column"
					>
						<Avatar
							src=""
							size="8"
							color="gray"
							radius="full"
							style={{
								background: "color(display-p3 0.882 0.933 0.992 / 0.077)",
							}}
							fallback={
								<GitHubLogoIcon
									width="50%"
									height="50%"
									style={{
										borderRadius: "100%",
										boxShadow: "0px 0px 20px var(--slate-2)",
										color: "color(display-p3 0.949 0.969 0.996 / 0.708)",
									}}
								/>
							}
						/>
					</Flex>
				</div>
				<Flex gap="4" justify="between">
					<Flex direction="column" gap="1">
						<Text size="5" weight="bold">
							Connect GitHub
						</Text>
						<Text color="gray" size="2">
							Please connect your account with Trag
						</Text>
					</Flex>
					<Button onClick={handleGithub}>Connect</Button>
				</Flex>
				<Separator size="4" />
				<Flex gap="6" height="100%" overflow="auto" wrap="wrap">
					<Flex
						gap="4"
						direction="column"
						flexGrow="1"
						flexBasis="0%"
						flexShrink="1"
					>
						<Text size="5" weight="bold">
							Connected Accounts
						</Text>
						<Card style={{ height: "100%" }}>
							{connections.length === 0 ? (
								<Flex
									width="100%"
									height="100%"
									align="center"
									justify="center"
									direction="column"
									gap="4"
								>
									<Avatar
										src=""
										size="6"
										color="gold"
										fallback={
											<Flex position="relative">
												<Github width={32} height={32} />
												<Flex position="absolute" top="4px" right="-10px">
													<Xmark strokeWidth={4} width={12} height={12} />
												</Flex>
											</Flex>
										}
									/>
									<Flex direction="column" gap="2" align="center">
										<Text weight="medium" color="gray" size="2">
											You do not have any connected GitHub account.
										</Text>
										<Button size="1" onClick={handleGithub} variant="ghost">
											Connect
										</Button>
									</Flex>
								</Flex>
							) : (
								<ScrollArea scrollbars="vertical">
									<Flex gap="4" direction="column">
										{connections.map((connection, idx) => (
											<GithubAccountModal connection={connection} key={idx} />
										))}
									</Flex>
								</ScrollArea>
							)}
						</Card>
					</Flex>
					<Flex
						gap="4"
						flexGrow="1"
						flexBasis="0%"
						flexShrink="1"
						height="100%"
						overflow="scroll"
						direction="column"
					>
						<Text size="5" weight="bold">
							Selected Repositories
						</Text>
						<Card style={{ height: "100%", overflow: "scroll" }}>
							<ScrollArea style={{ height: "100%", overflow: "scroll" }}>
								<Flex
									gap="4"
									width="100%"
									height="100%"
									direction="column"
									style={{ overflow: "scroll" }}
								>
									{projects.length === 0 ? (
										<Flex
											width="100%"
											height="100%"
											align="center"
											justify="center"
											direction="column"
											gap="4"
										>
											{connections.length === 0 ? (
												<Avatar
													src=""
													size="6"
													color="gold"
													fallback={
														<Flex position="relative">
															<Github width={32} height={32} />
															<Flex position="absolute" top="4px" right="-10px">
																<Xmark strokeWidth={4} width={12} height={12} />
															</Flex>
														</Flex>
													}
												/>
											) : (
												<Avatar
													src=""
													size="6"
													color="gold"
													fallback={
														<Flex position="relative">
															<Repository width={32} height={32} />
															<Flex position="absolute" top="4px" right="-10px">
																<Xmark strokeWidth={4} width={12} height={12} />
															</Flex>
														</Flex>
													}
												/>
											)}

											<Flex direction="column" gap="2">
												{connections.length === 0 ? (
													<Flex direction="column" gap="2" align="center">
														<Text weight="medium" color="gray" size="2">
															You do not have any connected GitHub account.
														</Text>
														<Button
															size="1"
															onClick={handleGithub}
															variant="ghost"
														>
															Connect
														</Button>
													</Flex>
												) : (
													<Flex
														direction="column"
														gap="2"
														align="center"
														px="9"
													>
														<Text weight="bold" color="gray" size="2">
															You do not have any selected GitHub repositories.
														</Text>
														<Text color="gray" size="1" align="center">
															Please select a repository by clicking on the
															connected GitHub account banner on the left side.
														</Text>
													</Flex>
												)}
											</Flex>
										</Flex>
									) : (
										projects.map((project) => (
											<Card
												key={project.projectId}
												className={styles.cardTrigger}
												onClick={() => setProjectToView(project)}
											>
												<Flex gap="3">
													<Flex style={{ position: "relative" }}>
														<Avatar
															size="4"
															color="gray"
															radius="full"
															fallback={displayName?.charAt(0) || "🦄"}
															src={getAvatarUrl(
																project.githubMetadata.connection_id
															)}
														/>
														<Avatar
															color="gray"
															radius="full"
															style={{
																bottom: 0,
																right: -2,
																width: 16,
																height: 16,
																position: "absolute",
															}}
															fallback={
																<GitHubLogoIcon width={32} height={32} />
															}
														/>
													</Flex>
													<Flex direction="column">
														<Text size="2" weight="bold">
															{project.githubMetadata.repo}
														</Text>
														<Text size="2" color="gray">
															{project.githubMetadata.owner}
														</Text>
													</Flex>
												</Flex>
											</Card>
										))
									)}
								</Flex>
							</ScrollArea>
						</Card>
					</Flex>
				</Flex>
				{projectToView ? (
					<RepoModal
						project={projectToView}
						closeModal={() => setProjectToView(null)}
					/>
				) : null}
			</Flex>
		</Flex>
	);
};

export default Repos;
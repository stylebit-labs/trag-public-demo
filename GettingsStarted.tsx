import {
  Badge,
  Box,
  Button,
  Card,
  Code,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@radix-ui/themes";
import styles from "./GettingStarted.module.scss";
import Feedback from "@components/Feeback/Feedback";
import { useAppDispatch, useAppSelector } from "@state/index";
import { toggleTheme } from "@state/reducers/utils";
import {
  CheckCircledIcon,
  GitHubLogoIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { FRONT_VERSION } from "@utils/consts";
import { Terminal } from "iconoir-react";
import toast from "react-hot-toast";
import { useEffect, useState, useCallback } from "react";
import { githubAuth } from "@api/project";
import { ANALYTICS_TRAG, mixpanel } from "@analytics/mixpanel";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { fetchUserSilent } from "@state/reducers/auth";
import RepositorySelect from "@components/RepositorySelect";
import {
  RepoList,
  SingleRepo,
} from "@components/RepositorySelect/RepositorySelect";

const GettingStarted = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useAppSelector((s) => s.utils.theme);
  const user = useAppSelector((s) => s.auth.sbUser);
  const githubConnections = useAppSelector(
    (s) => s.auth.sbUser.github.connections.length
  );

  const [pickedRepos, setPickedRepos] = useState<RepoList>([]);

  const handleCliWaitlist = async () => {
    const formBody = `firstName=${encodeURIComponent(
      user.displayName || ""
    )}&email=${encodeURIComponent(user.email)}&userGroup=${encodeURIComponent(
      "cliWaitlist"
    )}`;
    const toastId = toast.loading("Joining the list");
    // Change this URL to your own endpoint URL
    await fetch(
      "https://app.loops.so/api/newsletter-form/clvx2r2dj00f12ybyfqrz2u22",
      {
        method: "POST",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    toast.dismiss(toastId);
    toast.success("You are in!");
  };

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
    window
      .open(
        `https://github.com/apps/test-stylebit-labs/installations/new?redirect_uri=http://localhost:5173/getting-started`
      )
      ?.focus();
  };

  const selectRepo = useCallback((repoInfo: SingleRepo) => {
    setPickedRepos((currentRepos) => {
      const alreadySelected = currentRepos.find(
        (r) => r.repo === repoInfo.repo
      );
      if (alreadySelected) {
        // remove
        mixpanel.track(ANALYTICS_TRAG.SELECT_REPOSITORY);
        return currentRepos.filter((repo) => repo.repo !== repoInfo.repo);
      } else {
        // add
        mixpanel.track(ANALYTICS_TRAG.UNSELECT_REPOSITORY);
        return [...currentRepos, repoInfo];
      }
    });
  }, []);

  return (
    <Flex className={styles.gettingStarted}>
      <Flex flexGrow="1" direction="column" width="100%" height="100%">
        <header className={styles.header}>
          <Flex gap="4">
            <Feedback variant="ghost" color="gray" />
            <IconButton
              color="gray"
              variant="ghost"
              onClick={() =>
                dispatch(toggleTheme(theme === "dark" ? "light" : "dark"))
              }
            >
              {theme === "dark" ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </Flex>
        </header>
        <Flex
          gap="4"
          align="center"
          // justify="center"
          direction="column"
          className={styles.mainContainer}
        >
          <Flex
            align="center"
            justify="center"
            height="100%"
            direction="column"
            gap="4"
          >
            <Flex direction="column" align="center" gap="2">
              <Heading>Let's set up your account</Heading>
              <Text size="2" color="gray">
                It won't take long, I promise
              </Text>
            </Flex>
            <Card size="3" className={styles.card}>
              <Flex direction="column" gap="6">
                <Flex direction="column" gap="2">
                  <Flex align="center" justify="between">
                    <Text weight="bold" size="3">
                      1. Connect your GitHub account
                    </Text>
                    {githubConnections > 0 ? (
                      <Badge color="grass">
                        <CheckCircledIcon />
                        Connected
                      </Badge>
                    ) : null}
                  </Flex>
                  <Text size="1" color="gray">
                    By connected your GitHub account, Trag will be able to track
                    repositories and run pre reviews when there will be a new
                    pull request.
                  </Text>
                </Flex>
                {githubConnections === 0 ? (
                  <Button
                    color="gray"
                    highContrast
                    variant="soft"
                    onClick={handleGithub}
                  >
                    <GitHubLogoIcon />
                    <Text weight="medium">Connect</Text>
                  </Button>
                ) : null}
              </Flex>
            </Card>

            {githubConnections > 0 ? (
              <Card size="3" style={{ width: "100%" }}>
                <Flex direction="column" gap="6">
                  <Flex direction="column" gap="2">
                    <Flex align="center" justify="between">
                      <Text weight="bold" size="3">
                        2. Select repositories
                      </Text>
                    </Flex>
                    <Text size="1" color="gray">
                      You can select one or more repositories for Trag to run
                      the pre-reviews on.
                    </Text>
                    <RepositorySelect
                      isOpen
                      withTitle={false}
                      selectedRepos={pickedRepos}
                      installationId={
                        user.github.connections[0].installation_id
                      }
                    />
                  </Flex>
                  {githubConnections === 0 ? (
                    <Button
                      color="gray"
                      highContrast
                      variant="soft"
                      onClick={handleGithub}
                    >
                      <GitHubLogoIcon />
                      <Text weight="medium">Connect</Text>
                    </Button>
                  ) : null}
                </Flex>
              </Card>
            ) : null}
            <Card size="3">
              <Flex direction="column" gap="6">
                <Flex direction="column" gap="2">
                  <Flex align="center" justify="between">
                    <Text weight="bold" size="3">
                      3. Apply or create your own rules
                    </Text>
                  </Flex>
                  <Text size="1" color="gray">
                    By connected your GitHub account, Trag will be able to track
                    repositories and run pre reviews when there will be a new
                    pull request.
                  </Text>
                </Flex>
                {githubConnections === 0 ? (
                  <Button
                    color="gray"
                    highContrast
                    variant="soft"
                    onClick={handleGithub}
                  >
                    <GitHubLogoIcon />
                    <Text weight="medium">Connect</Text>
                  </Button>
                ) : null}
              </Flex>
            </Card>
          </Flex>
          <Flex direction="column" gap="4" p="5">
            <Flex align="center" justify="between">
              <Text weight="bold" size="3">
                Alternativly, local version is coming soon.
              </Text>
              <Button
                color="indigo"
                variant="ghost"
                onClick={handleCliWaitlist}
              >
                <Terminal width={15} height={15} />
                <Text size="1">Join the waitlist</Text>
              </Button>
            </Flex>
            <Text size="1" color="gray">
              If you don't want to connect your GitHub, we got you! Our local
              CLI version is in the making, join the waitlist to get early
              access.
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box position="absolute" bottom="2" right="2">
        <Code style={{ fontSize: 10 }} variant="soft" color="gray">
          Version {FRONT_VERSION}
        </Code>
      </Box>
    </Flex>
  );
};

export default GettingStarted;

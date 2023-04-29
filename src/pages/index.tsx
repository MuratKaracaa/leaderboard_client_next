import { useCallback } from "react";
import { GetServerSideProps } from "next";
import styled from "styled-components";

import { ResourceKey } from "@/common/localization/resources/resource";
import { getCookieData, removeCookie } from "@/common/utils/cookie";
import PATHS from "@/common/paths";

import Layout from "@/components/layout/Layout";
import DataGrid from "@/components/data-grid/DataGrid";
import { Column } from "@/components/data-grid/DataGridColumnsRow";
import GenericButton from "@/components/button/GenericButton";
import colors from "@/components/colors";
import breakpoints from "@/components/breakpoints";
import { deleteFromStore } from "@/common/utils/localStorage";

import { getRequest } from "@/service/httpService";
import { LeaderboardResponse, PlayerData } from "@/service/models/Leaderboard";
import serviceUrls from "@/service/serviceUrls";
import { useRouter } from "next/navigation";

const StyledDataGridWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 30%;

  display: flex;
  flex-direction: column;
  gap: 24px;

  margin-left: auto;
  margin-right: auto;

  width: 80%;

  @media ${breakpoints.mobile} {
    top: 25%;
  }
`;

const StyledLogoutButton = styled(GenericButton)`
  position: absolute;
  top: 10px;
  right: 10px;

  background-color: ${colors.primary.dark};
`;

const columns: Array<Column> = [
  {
    columnNameKey: "home_page_rank_column",
    dataFieldName: "rank",
  },
  {
    columnNameKey: "home_page_player_name_column",
    dataFieldName: "name",
  },
  {
    columnNameKey: "home_page_country_column",
    dataFieldName: "country",
  },
  {
    columnNameKey: "home_page_money_column",
    dataFieldName: "money",
  },
];

interface HomeProps {
  leaderboardData: Array<PlayerData>;
  leaderboardDataSelf: Array<PlayerData>;
}

const Home = ({
  leaderboardData,
  leaderboardDataSelf,
}: HomeProps): JSX.Element => {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    removeCookie("AUTH_TOKEN");
    deleteFromStore("AUTH_TOKEN");
    router.push(PATHS.LOGIN);
  }, []);

  return (
    <Layout currentPageKey="home_page_name">
      <StyledLogoutButton
        buttonText={"home_page_logout_button_text" as ResourceKey}
        onClickHandler={handleLogout}
      />
      <StyledDataGridWrapper>
        <DataGrid
          columns={columns}
          data={leaderboardData}
          highlightKeys={["money"]}
          specifiedRowIndicatorField="isSelf"
          groupingFieldName="country"
          isGroupable
          isSearchable
          groupingCriteriaKey="home_page_data_grid_group_criteria_country"
        />
        <DataGrid
          columns={columns}
          data={leaderboardDataSelf}
          highlightKeys={["money"]}
          highlightExclusionKeys={["country"]}
          specifiedRowIndicatorField="isSelf"
        />
      </StyledDataGridWrapper>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = getCookieData("AUTH_TOKEN", context);
  const {
    data: { leaderboardData, leaderboardDataSelf },
  } = await getRequest<LeaderboardResponse>(
    serviceUrls.SCORE.GETLEADERBOARD,
    token
  );

  return {
    props: {
      leaderboardData,
      leaderboardDataSelf,
    },
  };
};

export default Home;

package patches.vcsRoots

import jetbrains.buildServer.configs.kotlin.v2018_2.*
import jetbrains.buildServer.configs.kotlin.v2018_2.ui.*

/*
This patch script was generated by TeamCity on settings change in UI.
To apply the patch, remove the vcsRoot with id = 'HttpsGithubComSkbkonturRetailUiRefsHeadsMaster_2'
from your code, and delete the patch script.
*/
deleteVcsRoot(RelativeId("HttpsGithubComSkbkonturRetailUiRefsHeadsMaster_2"))


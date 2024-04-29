key words:

> useLoaderData; createBrowserRouter; RouterProvider; Router = router; useParams

### step one:

> npm create vite@4

### step two:

> install plugin : npm i eslint vite-plugin-eslint eslint-config-react-app --save-dev

### step three:

how to plan and build a react application

> FROM THE EARLIER “THINKING IN REACT” LECTURE:
> 1 Break the desired UI into components
> 2 Build a static version (no state yet)
> 3 Think about state management + data flow

👉 This works well for small apps with one page and a few features
👉 In real-world apps, we need to adapt this process

1 Gather application requirements and features
This is just a rough overview. In the real-world, things are never this linear
2 Divide the application into pages
👉 Thinkabouttheoverallandpage-levelUI
👉 BreakthedesiredUIintocomponents
👉 Designandbuildastaticversion(nostateyet)
3 Divide the application into feature categories
👉 Thinkaboutstatemanagement+dataflow
From earlier Fromearlier
From earlier
4 Decide on what libraries to use (technology decisions)

### step four:

move pages and features

### step five:

npm i react-router-dom@4

### step six:

install tailwind step by step
instal taildwind extension > Tailwind CSS IntelliSense
npm install -D prettier prettier-plugin-tailwindcss
config tailwindcss
{
"plugins": ["prettier-plugin-tailwindcss"],
"singleQuote": true
}

Video : Styling Text

 private void createThirdResource(TenantDo tenantDo) {
        List<TenantClusterRefInfo> tenantClusterRefInfoList =
            tenantClusterReferenceService.selectK8sClusterByTenantId(tenantDo.getId());
        // 排序，为得是先处理训练集群
        List<TenantClusterRefInfo> sortResult = new ArrayList<>(tenantClusterRefInfoList);
        sortResult.sort(Comparator.comparing(t -> BusinessTypeEnum.getOrderByValue(t.getBusinessType())));
        Map<String, Boolean> hasHandler = new HashMap<>(sortResult.size());
        for (TenantClusterRefInfo tenantClusterRefInfo : sortResult) {
            // 创建K8s profile，resourceQuota
            ApiClient apiClient = ClusterClientUtils.buildApiClient(tenantClusterRefInfo);
            if (BusinessTypeEnum.TRAINING.getValue().equals(tenantClusterRefInfo.getBusinessType())) {
                profileKubeAdapter.createProfile(tenantDo.getCode(), apiClient);
                authorizationPolicyKubeAdapter.createAuthorizationPolicy(tenantDo.getCode(), apiClient);
                profileKubeAdapter.createClusterRoleBinding(tenantDo.getCode(), apiClient);
            } else {
                // 创建 namespace
                namespaceKubeAdapter.createNamespace(tenantDo.getCode(), apiClient);
            }
            if (!hasHandler.containsKey(tenantClusterRefInfo.getK8sGatewayServer())) {
                // 微调业务不需要资源配额
                if (BusinessTypeEnum.getSftValue().contains(tenantClusterRefInfo.getBusinessType())) {
                    continue;
                }
                ResourceQuotaReq resourceQuotaReq = buildResourceQuotaReq(tenantClusterRefInfo, tenantDo.getCode());
                resourceQuotaAdapter.createResourceQuota(resourceQuotaReq, apiClient);
                hasHandler.put(tenantClusterRefInfo.getK8sGatewayServer(), true);
            }
        }
        HarborProject harborProject = new HarborProject();
        harborProject.setProjectName(getHarborProjectName(tenantDo.getCode()));
        harborProject.setNeedPublic(true);
        harborRestAdapter.createHarborProject(harborProject, buildHarborServerInfo());
    }

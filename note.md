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

    这段代码是用Java编写的，它看起来是一个处理租户集群的部分，具体解释如下：

初始化：
首先通过给定的租户ID获取租户集群引用列表。
排序：
创建租户集群引用列表的副本，并根据业务类型进行排序，优先处理训练集群。
处理：
对于每个租户集群引用，逐个处理：
创建一个基于租户集群引用信息构建的 API 客户端。
如果集群是用于训练的 (BusinessTypeEnum.TRAINING)，则执行与创建 K8s 配置文件、授权策略和集群角色绑定相关的几个操作。
如果不是训练集群，就为该租户创建一个命名空间。
检查该集群的网关服务器是否已处理过。如果没有：
如果不是特殊的业务类型，则创建资源配额。
标记网关服务器已处理过。
Harbor 项目创建：
在处理完所有集群后，创建一个 Harbor 项目。
Harbor 项目配置为使用租户的代码作为项目名称，并设置为公开访问。
总的来说，这段代码似乎是一个较大系统的一部分，用于管理不同租户的 Kubernetes 集群，根据集群和租户的类型执行各种设置和配置任务。它根据需要创建配置文件、命名空间、资源配额和 Harbor 项目。

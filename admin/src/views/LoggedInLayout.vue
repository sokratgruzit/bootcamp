<template>
	<el-container>
      	<Sidebar/>
      	<el-container direction='vertical'>
        	<Header/>
        	<transition name="router" mode="out-in">
          		<el-main>
          			<transition name="router" mode="out-in">
            			<router-view :key="$route.fullPath"></router-view>
            		</transition>
          		</el-main>
        	</transition>
      	</el-container>
    </el-container>
</template>

<script>
	import Header from "../components/modules/Header";
	import Footer from "../components/modules/Footer";
	import Sidebar from "../components/modules/Sidebar";

	export default { 
	  	name: 'LoggedInLayout',
	  	components: {
	    	Header,
	    	Footer,
	    	Sidebar
	  	}
	}
</script>
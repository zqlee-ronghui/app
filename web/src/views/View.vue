<template>
  <div>
    <canvas class="c" ref="ThreeJS" height="500px"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
export default {
  props: {
    id: {}
  },
  name: "View",
  data(){
    return{
      scene: null,
      camera: null,
      cameraPole: null,
      renderer: null,
      canvas: null,
      canvasW: 0,
      canvasH: 0,
      cameraParam: {
        fov: 30,
        aspect: 2,
        near: .1,
        far: 200
      },
      planArr: [
        { x: -3, y: 3, name: '第一块区域' },
        { x: 3, y: 3, name: '第二块区域'},
        { x: -3, y: -3, name: '第三块区域' },
        { x: 3, y: -3, name: '第四块区域' }
      ]
    }
  },
  created() {
    this.canvasW = window.innerWidth;
    this.canvasH = window.innerHeight;
    // 初始化设置宽高比
    this.cameraParam.aspect = this.canvasW / this.canvasH
  },
  mounted(){
    this.start()
  },
  methods: {
    start(){
      // 初始化三要素
      this.initMain()
      // 启用渲染
      this.render()
    },
    initMain(){
      // 初始化三要素
      this.initScene()
      this.initCamera()
      this.initRenderer()
      // 添加环境光
      this.addLight()
      this.createCube()
    },
    initScene(){
      // 创建场景
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color('white');
    },
    initCamera(){
      // 创建透视摄像头
      const cP = this.cameraParam;
      this.camera = new THREE.PerspectiveCamera(cP.fov, cP.aspect, cP.near, cP.far);
      this.camera.position.z = 30;
      this.scene.add(this.camera)
    },
    initRenderer(){
      // 渲染器
      this.canvas = this.$refs.ThreeJS;
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,//是否开启反锯齿，设置为true开启反锯齿。
        alpha: true,//是否可以设置背景色透明。
        logarithmicDepthBuffer: true//模型的重叠部位便不停的闪烁起来。这便是Z-Fighting问题，为解决这个问题，我们可以采用该种方法
      })
    },
    addLight(){
      // 环境光
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.AmbientLight(color, intensity);
      this.scene.add(light)
    },
    render(){
      // 启动动画
      this.renderer.render(this.scene, this.camera);
      // 动态监听窗口尺寸变化
      if (this.resizeRendererToDisplaySize(this.renderer)) {
        const canvas = this.renderer.domElement;
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
      }
      requestAnimationFrame(this.render.bind(this))
    },
    resizeRendererToDisplaySize(renderer){
      const canvas = renderer.domElement;
      this.canvasW = window.innerWidth;
      this.canvasH = window.innerHeight;
      const needResize = canvas.width !== this.canvasW || canvas.height !== this.canvasH;
      if(needResize){
        this.renderer.setSize(this.canvasW, this.canvasH, false);
      }
      return needResize;
    },
    geometry(width, height, depth){
      return new THREE.BoxGeometry(width, height, depth)
    },
    createCube(){
      for(let i = 0; i < this.planArr.length; i++){
        // 添加几何体
        const material = new THREE.MeshPhongMaterial({
          color: 0x8aff58
        })

        const cube = new THREE.Mesh(this.geometry(5, 5, .001), material);
        this.scene.add(cube);
        // 添加名称
        cube.name = this.planArr[i].name
        // 设置几何模型形变
        cube.position.set(this.planArr[i].x, this.planArr[i].y, 0)
      }
    },
  }
}
</script>

<style scoped>

</style>
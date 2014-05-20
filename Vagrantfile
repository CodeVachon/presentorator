VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
	config.vm.box = "hashicorp/precise32"
	config.vm.provision :shell, :path => "bootstrap.sh"
	config.vm.network :forwarded_port, host: 8008, guest: 80
	config.vm.box_check_update = false
end

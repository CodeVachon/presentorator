VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
	config.vm.box = "hashicorp/precise32"
	config.vm.provision :shell, :path => "bootstrap.sh"
	config.vm.network :forwarded_port, host: 8008, guest: 80
	config.vm.box_check_update = false

	config.vm.network :private_network, ip: "192.168.3.10"
	config.vm.hostname = "presentorator"

	if !Vagrant.has_plugin?('vagrant-hostsupdater')
		puts "vagrant-hostsupdater missing, please install the vagrant-hostsupdater plugin!"
		puts "Run this command in your terminal / Command Line:"
		puts "vagrant plugin install vagrant-hostsupdater"
	else
		config.hostsupdater.aliases = ["presentorator"]
	end
end
